import { Meta } from '@/components/layout/Meta';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Section';
import { PHONE, PHONE_HREF } from '@/lib/constants';

export const NotFound = () => (
  <>
    <Meta title="Page not found" />

    <section className="grain relative grid min-h-[70vh] place-items-center bg-cream py-32">
      <Container className="relative z-10 text-center">
        <p className="font-display text-[clamp(6rem,22vw,14rem)] leading-none text-orange/15">404</p>

        <h1 className="-mt-6 font-display text-[clamp(1.75rem,5vw,3rem)] leading-tight">
          This one got away.
        </h1>

        <p className="mx-auto mt-5 max-w-md text-[1.02rem] text-muted">
          The page you are after has moved or never existed. Everything else is still exactly where
          you left it.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button to="/" size="lg">
            Back to home
          </Button>

          <Button href={PHONE_HREF} variant="outline" size="lg">
            Call {PHONE}
          </Button>
        </div>
      </Container>
    </section>
  </>
);
