import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-10 px-2">
      <div className="flex gap-4 max-w-xs text-2xl justify-between mb-4 hover:*:underline *:underline-offset-2 mx-auto">
        <Link
          href={"https://www.linkedin.com/in/harsh-dagar/"}
          title="LinkedIn"
        >
          LinkedIn
        </Link>
        <Link href={"https://x.com/hrsh_dgr"} title="X">
          X
        </Link>
        <Link href={"https://github.com/regex5440"} title="GitHub">
          GitHub
        </Link>
      </div>
      <div className="w-fit m-auto">
        <div>
          <p>
            Contact:{" "}
            <Link href={"mailto:harshdagar@hdxdev.in"}>
              harshdagar@hdxdev.in
            </Link>
          </p>
        </div>
        <div className="border-l h-full w-0" />
      </div>
      <div className="w-fit m-auto mt-1 border-t p-4 text-center">
        <p>
          {new Date().getFullYear()}, Design & Developed by{" "}
          <Link
            href="https://www.linkedin.com/in/harsh-dagar/"
            className="underline underline-offset-4 text-nowrap"
          >
            Harsh Dagar
          </Link>
        </p>
      </div>
    </footer>
  );
}
