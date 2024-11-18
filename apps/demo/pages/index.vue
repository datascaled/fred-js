<template>
  <div class="landing">
    <main class="landing__main">
      <h1 class="landing__title">Fred</h1>

      <ul class="landing__links">
        <li class="landing__link">
          <SimpleLink href="/about">About</SimpleLink>
        </li>

        <li class="landing__link">
          <SimpleLink href="/demos">Demos</SimpleLink>
        </li>

        <li class="landing__link">
          <SimpleLink
            href="https://github.com/datascaled/fred-js"
            target="_blank"
          >
            GitHub
          </SimpleLink>
        </li>
      </ul>
    </main>

    <footer class="landing__footer">
      <div class="landing__created-by">
        Crafted with ❤️ by
        <a
          class="footer-link"
          href="https://datascale.ch"
          target="_blank"
        >
          Datascale
        </a>
      </div>
    </footer>
  </div>
</template>
<style>
  .landing {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    overflow: clip;
  }

  .landing__main {
    flex-grow: 1;
  }

  .landing__title {
    font-size: calc(var(--t-rem) * (48 - 10) + 10rem);
    line-height: 1;
  }

  .landing__links {
    margin-top: calc(var(--t-rem) * (-4 - 1) + 1rem);
  }

  .landing__link {
    font-size: calc(var(--t-rem) * (4 - 2) + 2rem);
    margin-left: calc(var(--t-rem) * (3 - 0.625) + 0.625rem);
    line-height: calc(var(--t-rem) * (5 - 3) + 3rem);
  }

  .landing__footer {
    display: flex;
    justify-content: flex-end;
    color: #888;
    padding: 1rem;
  }

  .footer-link {
    text-decoration: underline;
  }

  .landing__created-by {
  }
</style>
