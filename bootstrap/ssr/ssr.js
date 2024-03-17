import { jsx } from "react/jsx-runtime";
import ReactDOMServer from "react-dom/server";
import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
async function resolvePageComponent(path, pages) {
  for (const p of Array.isArray(path) ? path : [path]) {
    const page = pages[p];
    if (typeof page === "undefined") {
      continue;
    }
    return typeof page === "function" ? page() : page;
  }
  throw new Error(`Page not found: ${path}`);
}
const appName = "RankRover.ai";
createServer(
  (page) => createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.jsx`, /* @__PURE__ */ Object.assign({ "./pages/app/apps/index.jsx": () => import("./assets/index-Cqr6bOkE.js"), "./pages/app/apps/show.jsx": () => import("./assets/show-9NKXJR_R.js"), "./pages/app/content/index.jsx": () => import("./assets/index-CQXLmxkr.js"), "./pages/app/content/show.jsx": () => import("./assets/show-CJ2azXPJ.js"), "./pages/app/error.jsx": () => import("./assets/error-Cs01fxcS.js"), "./pages/app/login.jsx": () => import("./assets/login-BbSwQInp.js"), "./pages/app/register.jsx": () => import("./assets/register-C600NPfS.js"), "./pages/app/select-plan.jsx": () => import("./assets/select-plan-B9w_IUcO.js"), "./pages/app/thank-you.jsx": () => import("./assets/thank-you-BJAdrC8X.js"), "./pages/blog/show.jsx": () => import("./assets/show-FM2Mbb8T.js"), "./pages/home.jsx": () => import("./assets/home-BCnisRUe.js"), "./pages/pricing.jsx": () => import("./assets/pricing-D2dTOkhV.js") })),
    setup: ({ App, props }) => {
      return /* @__PURE__ */ jsx(App, { ...props });
    }
  })
);
