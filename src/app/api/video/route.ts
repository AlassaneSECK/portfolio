import { NextRequest, NextResponse } from "next/server";
import path from "node:path";
import { createReadStream } from "node:fs";
import { promises as fs } from "node:fs";
import { Readable } from "node:stream";

const MEDIA_ROOT = path.join(process.cwd(), "public", "media");
const VARIANTS = ["desktop", "mobile"] as const;
const FORMATS = ["mp4", "webm"] as const;
const DEFAULT_ASSET = "cryptoportiques-demo";
const DEFAULT_VARIANT: VideoVariant = "desktop";
const DEFAULT_FORMAT: VideoFormat = "mp4";

type VideoVariant = (typeof VARIANTS)[number];
type VideoFormat = (typeof FORMATS)[number];

const MIME_TYPE: Record<VideoFormat, string> = {
  mp4: "video/mp4",
  webm: "video/webm"
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  return streamVideo(request, { withBody: true });
}

export async function HEAD(request: NextRequest) {
  return streamVideo(request, { withBody: false });
}

async function streamVideo(request: NextRequest, options: { withBody: boolean }): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const requestedAsset = (searchParams.get("asset") || DEFAULT_ASSET).replace(/[^a-z0-9-_]/gi, "").toLowerCase();
  const asset = requestedAsset.length > 0 ? requestedAsset : DEFAULT_ASSET;
  const variant = normalizeVariant(searchParams.get("variant"));
  const format = normalizeFormat(searchParams.get("format"));

  const resolvedFile = await resolveFile(asset, variant, format);
  if (!resolvedFile) {
    return NextResponse.json(
      { message: "La ressource vidéo demandée est introuvable sur le serveur." },
      { status: 404 }
    );
  }

  const { filePath, mimeType } = resolvedFile;
  const fileStat = await fs.stat(filePath);
  const rangeHeader = request.headers.get("range");
  const headers = new Headers({
    "Content-Type": mimeType,
    "Accept-Ranges": "bytes",
    "Cache-Control": "public, max-age=31536000, immutable"
  });

  if (!rangeHeader) {
    headers.set("Content-Length", String(fileStat.size));
    if (!options.withBody) {
      return new NextResponse(null, { status: 200, headers });
    }
    const stream = Readable.toWeb(createReadStream(filePath)) as ReadableStream;
    return new NextResponse(stream, { status: 200, headers });
  }

  const parsedRange = parseRange(rangeHeader, fileStat.size);
  if (!parsedRange) {
    headers.set("Content-Range", `bytes */${fileStat.size}`);
    return new NextResponse("Plage non satisfaisante", { status: 416, headers });
  }

  const { start, end } = parsedRange;
  headers.set("Content-Range", `bytes ${start}-${end}/${fileStat.size}`);
  headers.set("Content-Length", String(end - start + 1));

  if (!options.withBody) {
    return new NextResponse(null, { status: 206, headers });
  }

  const chunk = Readable.toWeb(createReadStream(filePath, { start, end })) as ReadableStream;
  return new NextResponse(chunk, { status: 206, headers });
}

async function resolveFile(asset: string, variant: VideoVariant, format: VideoFormat) {
  const candidatePaths = [
    path.join(MEDIA_ROOT, `${asset}-${variant}.${format}`),
    path.join(MEDIA_ROOT, `${asset}.${format}`),
    path.join(MEDIA_ROOT, `${asset}-${DEFAULT_VARIANT}.${format}`)
  ];

  for (const filePath of candidatePaths) {
    try {
      await fs.access(filePath);
      return { filePath, mimeType: MIME_TYPE[format] };
    } catch {
      // Ignore missing file and try next candidate.
    }
  }

  return null;
}

function normalizeVariant(value: string | null): VideoVariant {
  if (!value) {
    return DEFAULT_VARIANT;
  }

  const normalized = value.toLowerCase();
  return VARIANTS.includes(normalized as VideoVariant) ? (normalized as VideoVariant) : DEFAULT_VARIANT;
}

function normalizeFormat(value: string | null): VideoFormat {
  if (!value) {
    return DEFAULT_FORMAT;
  }

  const normalized = value.toLowerCase();
  return FORMATS.includes(normalized as VideoFormat) ? (normalized as VideoFormat) : DEFAULT_FORMAT;
}

function parseRange(value: string, fileSize: number) {
  const matches = value.match(/bytes=(\d+)-(\d*)/i);
  if (!matches) {
    return null;
  }

  const start = Number(matches[1]);
  const end = matches[2] ? Number(matches[2]) : fileSize - 1;

  if (Number.isNaN(start) || Number.isNaN(end) || start > end || end >= fileSize) {
    return null;
  }

  return { start, end };
}
