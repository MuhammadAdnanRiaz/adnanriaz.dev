import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="main" className="container-x min-h-[70vh] flex flex-col justify-center py-24">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 text-4xl sm:text-6xl">That page has shipped elsewhere.</h1>
        <p className="mt-6 text-muted max-w-xl">
          The link may be old. Everything current is on the home page.
        </p>
        <Link href="/" className="btn btn-primary mt-10 w-fit">Back to the front page</Link>
      </main>
      <Footer />
    </>
  );
}
