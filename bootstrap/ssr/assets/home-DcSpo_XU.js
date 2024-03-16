import { jsx, jsxs } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { ChatBubbleLeftIcon, BanknotesIcon, BellAlertIcon } from "@heroicons/react/24/outline";
import { L as Layout } from "./web-Bnj_esma.js";
import { c as cn, B as Button } from "./button-hFl330a_.js";
import { B as Badge } from "./badge-DvbvYTRT.js";
import { P as PricingGrid } from "./PricingGrid-De7aQqu4.js";
import "./footer-0Q4KCSOe.js";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "lucide-react";
import "./card-BTxPqJJ5.js";
function ShowcaseSection({
  className,
  reverse,
  largeImage,
  title,
  description,
  features,
  image,
  ctas
}) {
  return /* @__PURE__ */ jsx("section", { className: cn("py-12 text-black bg-white lg:py-24", className), children: /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "grid items-center grid-cols-1 gap-12 lg:gap-24 lg:grid-cols-12", children: [
    /* @__PURE__ */ jsxs("div", { className: cn("lg:col-span-7", largeImage && "lg:col-span-5"), children: [
      /* @__PURE__ */ jsxs("header", { children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl font-bold", children: title }),
        /* @__PURE__ */ jsx("p", { className: "mb-8 text-lg text-muted-foreground", children: description })
      ] }),
      /* @__PURE__ */ jsx("ul", { className: "flex flex-col gap-4", children: features.map((feature, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-x-3", children: [
        /* @__PURE__ */ jsx("span", { className: "w-3 h-3 rounded-full bg-rose-400" }),
        /* @__PURE__ */ jsx("span", { className: "text-lg leading-tight", children: feature })
      ] }, i)) }),
      ctas && /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 mt-12", children: ctas })
    ] }),
    /* @__PURE__ */ jsx("div", { className: cn("lg:col-span-5 shadow rounded-md", largeImage && "lg:col-span-7", reverse && "lg:order-first"), children: image })
  ] }) }) });
}
function HomePage({
  current_user,
  subscription_plans
}) {
  const features = [
    {
      name: "Dynamic Content Generation",
      description: "Create captivating, SEO-driven articles tailored to your business needs.",
      icon: ChatBubbleLeftIcon
    },
    {
      name: "Multilingual Support",
      description: "Break language barriers. Generate content in multiple languages to reach a global audience.",
      icon: BanknotesIcon
    },
    {
      name: "Keyword Optimization",
      description: "Input your target keywords and let our AI craft content that climbs the search engine ranks.",
      icon: BellAlertIcon
    },
    {
      name: "Choose Content Format",
      description: "Choose from various formats to match your brand's voice and audience's preferences.",
      icon: BellAlertIcon
    },
    {
      name: "Content Clusters",
      description: "Leverage our AI to create clusters of content. We'll recommend keywords and titles!",
      icon: BellAlertIcon
    },
    {
      name: "It's your content",
      description: "Export your content in multiple formats including markdown, semantic HTML, and JSON for seamless integration.",
      icon: BellAlertIcon
    }
  ];
  const articles = [
    {
      title: "How RankRover.ai is Revolutionizing SEO Content Creation",
      ingress: "In the dynamic world of digital marketing, staying ahead is not just about keeping pace but setting the pace.",
      slug: "how-rankroverai-is-revolutionizing-seo-content-creation",
      poster: "yellow.jpg"
    },
    {
      title: "Achieving Higher Organic Traffic: Insights from RankRover.ai",
      ingress: "In today's digital marketplace, the quest for higher organic traffic is relentless. Businesses of all sizes vie for that coveted top spot on search engine results pages (SERPs).",
      slug: "achieving-higher-organic-traffic-insights-from-rankroverai",
      poster: "window.png"
    },
    {
      title: "From Keywords to Content: How RankRover.ai Powers Your SEO Strategy",
      ingress: "In the rapidly evolving digital landscape, businesses are in an endless competition to rank higher on search engine results pages (SERPs).",
      slug: "from-keywords-to-content-how-rankroverai-powers-your-seo-strategy",
      poster: "clover.jpg"
    }
  ];
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: "Hi" }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: "In the digital age, standing out online is paramount. RankRover.ai harnesses the power of AI to craft SEO-optimized articles that resonate with your audience and search engines alike. Say goodbye to content creation hurdles and hello to effortless ranking success." }),
      /* @__PURE__ */ jsx("meta", { name: "keywords", content: "seo, ai, traffic, SaaS, chatgpt, tools, content, content generation" }),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow" })
    ] }),
    /* @__PURE__ */ jsxs("header", { className: "container grid items-center grid-cols-1 py-12 mx-auto overflow-x-hidden text-black bg-white lg:grid-cols-12 lg:py-32 gap-x-28 gap-y-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "col-span-1 lg:col-span-7", children: [
        /* @__PURE__ */ jsx(Badge, { className: "mb-4", children: "Inrease organic traffic!" }),
        /* @__PURE__ */ jsxs("h1", { className: "mb-4 text-4xl font-bold leading-tight lg:text-6xl", children: [
          /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Elevate" }),
          " Your Digital Presence with AI-Powered Content"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mb-8 text-lg leading-relaxed lg:text-xl text-muted-foreground", children: "Generate engaging, optimized content tailored your business that drives traffic and boosts your ranking with ease. It's really that simple!" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-2", children: [
          /* @__PURE__ */ jsx(Button, { size: "lg", asChild: true, children: current_user ? /* @__PURE__ */ jsx(Link, { href: "/apps", children: "Go to app 🌟" }) : /* @__PURE__ */ jsx(Link, { href: "/register", children: "Get started 🌟" }) }),
          /* @__PURE__ */ jsx(Button, { size: "lg", variant: "outline", children: /* @__PURE__ */ jsx(Link, { href: "#features", children: "Learn more 🤔" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "col-span-1 mx-auto lg:col-span-4", children: /* @__PURE__ */ jsxs(
        "svg",
        {
          className: "object-cover w-full h-full",
          dataName: "Layer 1",
          xmlns: "http://www.w3.org/2000/svg",
          width: "404",
          height: "537",
          viewBox: "0 0 404 537",
          xmlnsXlink: "http://www.w3.org/1999/xlink",
          children: [
            /* @__PURE__ */ jsx("rect", { x: "212.83878", width: "186.35767", height: "213.90617", fill: "#e6e6e6" }),
            /* @__PURE__ */ jsx("path", { id: "b194f79f-1dcb-4c1b-9adc-ca19157cb8ab-665", "data-name": "uuid-63f12f30-9ab6-4f05-9b95-b74528116577-49", d: "M176.60349,193.94734c5.25679-5.34964,12.27813-6.97362,15.68212-3.62759s1.90142,10.3939-3.35795,15.74475a18.77011,18.77011,0,0,1-7.46654,4.77885l-22.55949,22.38538L148.62248,222.4183l23.331-20.92028a18.7715,18.7715,0,0,1,4.65-7.55069Z", fill: "#ffb6b6" }),
            /* @__PURE__ */ jsx("path", { d: "M104.45535,175.46944l23.65312,52.473,37.77041-20.44494,13.51733,7.17415s-30.8765,51.61985-52.01762,45.74363S68.6963,201.25722,75.46028,184.81284s28.99505-9.34339,28.99505-9.34339Z", fill: "#e6e6e6" }),
            /* @__PURE__ */ jsx("rect", { x: "161.02783", y: "256.45859", width: "3.241", height: "9.72302", fill: "#3f3d56" }),
            /* @__PURE__ */ jsx("path", { d: "M164.26883,237.73816h-3.241V219.01773h3.241Zm0-37.44165h-3.241V181.57608h3.241Zm0-37.44086h-3.241V144.13443h3.241Zm0-37.44165h-3.241V106.69278h3.241Zm0-37.44165h-3.241V69.25192h3.241Z", fill: "#3f3d56" }),
            /* @__PURE__ */ jsx("polygon", { points: "164.269 50.531 161.028 50.531 161.028 39.187 172.371 39.187 172.371 42.428 164.269 42.428 164.269 50.531", fill: "#3f3d56" }),
            /* @__PURE__ */ jsx("path", { d: "M314.98337,42.42818H297.157v-3.241h17.8263v3.241Zm-35.65262,0H261.50446v-3.241h17.82629Zm-35.6534,0H225.851v-3.241h17.82631Zm-35.6526,0H190.19844v-3.241h17.82631Z", fill: "#3f3d56" }),
            /* @__PURE__ */ jsx("rect", { x: "332.80969", y: "39.18717", width: "9.72302", height: "3.241", fill: "#3f3d56" }),
            /* @__PURE__ */ jsx("path", { d: "M284.313,445.52185c-.8443-1.42364-4.49683.10068-5.16834-1.19134-.66912-1.28736,2.72449-3.24888,4.66333-7.7298.34967-.80808,2.553-5.90033.92188-7.47162-3.09174-2.97836-17.23962,9.31259-22.19074,5.2904-1.0866-.88269-1.8457-2.64483-5.13427-5.50582-1.30829-1.13816-2.09937-1.652-2.865-1.46085-1.08637.27127-1.17243,1.72522-2.33734,4.584-1.747,4.2873-2.78028,4.02842-3.79816,7.449-.75562,2.53924-.583,4.01553-1.47217,4.30313-1.25824.407-2.41638-2.28632-4.011-2.04517-1.62719.24613-2.611,3.382-2.92169,5.73-.58313,4.40607,1.035,7.31348,1.93183,10.37064.97461,3.32236,1.553,8.37494-.6977,15.52759l-22.27719,62.76611c4.91812-12.87945,19.15842-48.18536,25.14218-61.3053,1.72742-3.78744,3.63471-7.62909,7.551-9.14526,3.77044-1.45978,8.94867-.58823,15.55029-2.17862.771-.1857,2.91052-.73007,3.17981-1.98849.22266-1.04038-1.03583-1.6211-.84247-2.59549.25934-1.307,2.73413-1.32306,5.77533-2.831a17.99707,17.99707,0,0,0,4.62934-3.41531c.34637-.32785,5.49511-5.26166,4.37115-7.1568H284.313Z", fill: "#f2f2f2" }),
            /* @__PURE__ */ jsx("path", { d: "M196.668,478.56458c-.94235.0036-1.248,2.23611-2.07592,2.1929-.82492-.043-.80848-2.2746-2.44831-4.51911-.29571-.40475-2.1593-2.95547-3.40115-2.60824-2.35385.65808-.4035,11.14828-3.80618,12.41781a37.65279,37.65279,0,0,0-4.18369.93134c-.9361.31372-1.41656.55371-1.54364.98465-.1803.61145.50845,1.07324,1.57544,2.46979,1.60016,2.09445,1.175,2.52691,2.56009,4.01342,1.02826,1.10352,1.80264,1.44477,1.68722,1.96415-.16326.735-1.81933.5263-2.16107,1.3785-.34869.86966.90659,2.2573,1.9693,3.08725,1.9943,1.5575,3.88812,1.60221,5.64737,2.04413a14.82952,14.82952,0,0,1,7.41974,4.82267l24.37836,29.04382c-4.90229-6.13-18.12189-23.30609-22.83472-30.0285-1.3605-1.94062-2.69568-3.98517-2.30984-6.34479.37142-2.27176,2.29327-4.56177,3.41748-8.26078.13131-.432.48144-1.63916-.05848-2.13442-.44638-.40946-1.09451.04067-1.517-.33539-.56665-.50443.13952-1.7237.27688-3.6514a10.24651,10.24651,0,0,0-.34054-3.25754c-.061-.26459-.99695-4.21518-2.25138-4.21036Z", fill: "#f2f2f2" }),
            /* @__PURE__ */ jsx("path", { d: "M215.46758,482.78467l-.56775-5.06818.2594-.38421a9.377,9.377,0,0,0,1.81948-5.15873c.00122-.26184-.011-.52371-.02325-.79043a7.92759,7.92759,0,0,1,.5751-3.90329c.38422-.85407,1.46344-2.83142,3.08594-2.5867a1.83778,1.83778,0,0,1,1.018.49676c.03671-.05871.07464-.11746.115-.18109a5.57562,5.57562,0,0,1,1.29089-1.41937,6.51973,6.51973,0,0,0,1.08167-1.0939c.21045-.26184.37442-.49189.51269-.68522a2.37985,2.37985,0,0,1,1.93451-1.27011,2.54008,2.54008,0,0,1,1.93207,1.46833,12.21561,12.21561,0,0,1,1.122,2.21716,3.83251,3.83251,0,0,0,.18967.43561c.33282.48944,3.03823.0318,4.05746-.13462,2.28937-.38177,4.27039-.71212,5.08655.73172.5849,1.03272.15051,2.39826-1.33008,4.16761a8.27542,8.27542,0,0,1-1.38757,1.297,1.6962,1.6962,0,0,1,.81494,1.06455h0c.30835,1.22848-.74762,2.45944-3.13733,3.66348a8.4363,8.4363,0,0,1-2.51206.89569,9.86718,9.86718,0,0,1-1.40835.12482,1.668,1.668,0,0,1-.20679.75128,2.50731,2.50731,0,0,1-2.60995,1.04984,20.46313,20.46313,0,0,1-3.69406-.59467,8.9587,8.9587,0,0,0-2.33219-.3475c-1.15262.093-2.041,1.01559-3.08346,2.21228l-2.6026,3.04187Z", fill: "#f2f2f2" }),
            /* @__PURE__ */ jsx("path", { d: "M218.10127,452.60873l-4.75842,1.83472-.43744-.15347a9.37685,9.37685,0,0,0-5.45151-.45148c-.2536.06525-.50378.14349-.75869.223a7.92769,7.92769,0,0,1-3.92151.43378c-.92362-.155-3.11-.69739-3.28485-2.32889a1.83766,1.83766,0,0,1,.22232-1.11075c-.06614-.0206-.13257-.04239-.20435-.0653a5.57632,5.57632,0,0,1-1.70041-.88868,6.51985,6.51985,0,0,0-1.33249-.76883c-.30667-.13714-.57077-.23739-.79284-.32211a2.3797,2.3797,0,0,1-1.71924-1.5491,2.54014,2.54014,0,0,1,.93023-2.24133,12.21653,12.21653,0,0,1,1.86005-1.64774,3.83289,3.83289,0,0,0,.37326-.29395c.389-.44607-.73987-2.94692-1.15936-3.89062-.95-2.11765-1.772-3.95007-.5824-5.10577.85059-.8277,2.28165-.75391,4.36868.22946a8.27473,8.27473,0,0,1,1.60657,1.01321,1.69593,1.69593,0,0,1,.823-1.05829h0c1.11011-.60986,2.56863.09934,4.33945,2.10547a8.43586,8.43586,0,0,1,1.50357,2.2027,9.8696,9.8696,0,0,1,.478,1.33066,1.66812,1.66812,0,0,1,.77918.00946c.85211.21045,1.4288.9624,1.67752,2.2583a20.46315,20.46315,0,0,1,.36179,3.72409,8.9566,8.9566,0,0,0,.25543,2.344c.38232,1.09134,1.50006,1.71662,2.92206,2.42148l3.60253,1.74591Z", fill: "#f2f2f2" }),
            /* @__PURE__ */ jsx("path", { d: "M215.46758,437.67773l-.56775-5.06817.2594-.38422a9.377,9.377,0,0,0,1.81948-5.15872c.00122-.26184-.011-.52371-.02325-.79044a7.9276,7.9276,0,0,1,.5751-3.90329c.38422-.85406,1.46344-2.83142,3.08594-2.5867a1.83773,1.83773,0,0,1,1.018.49677c.03671-.05872.07464-.11746.115-.18109a5.57545,5.57545,0,0,1,1.29089-1.41937,6.51989,6.51989,0,0,0,1.08167-1.09391c.21045-.26184.37442-.49188.51269-.68521a2.3798,2.3798,0,0,1,1.93451-1.27011,2.54009,2.54009,0,0,1,1.93207,1.46832,12.21561,12.21561,0,0,1,1.122,2.21717,3.83216,3.83216,0,0,0,.18967.4356c.33282.48944,3.03823.0318,4.05746-.13461,2.28937-.38177,4.27039-.71213,5.08655.73172.5849,1.03272.15051,2.39826-1.33008,4.1676a8.27552,8.27552,0,0,1-1.38757,1.297,1.69617,1.69617,0,0,1,.81494,1.06455h0c.30835,1.22848-.74762,2.45944-3.13733,3.66348a8.43658,8.43658,0,0,1-2.51206.89569,9.86864,9.86864,0,0,1-1.40835.12482,1.668,1.668,0,0,1-.20679.75128,2.5073,2.5073,0,0,1-2.60995,1.04983,20.46231,20.46231,0,0,1-3.69406-.59466,8.95919,8.95919,0,0,0-2.33219-.34751c-1.15262.093-2.041,1.0156-3.08346,2.21228l-2.6026,3.04187Z", fill: "#f2f2f2" }),
            /* @__PURE__ */ jsx("path", { d: "M220.65321,536.05548l-1.0621-.66565-.257-1.226.257,1.226-1.23828.142c-.01959-.115-.08688-.37933-.18842-.79291a177.23012,177.23012,0,0,1-3.65368-20.02307,204.14876,204.14876,0,0,1-1.65555-23.17017c-.115-7.80658.25452-13.71661.55063-18.46661.2239-3.5827.49557-6.99411.7623-10.31744.70968-8.87848,1.379-17.265.881-26.54975a24.59871,24.59871,0,0,0-2.862-10.97818A23.31154,23.31154,0,0,0,206.2,418.21021l1.56131-1.96265a25.85852,25.85852,0,0,1,6.62338,7.78213,26.94025,26.94025,0,0,1,3.16791,12.05c.50656,9.44867-.17008,17.916-.88712,26.88013-.26431,3.31107-.536,6.70779-.75863,10.27582-.29368,4.706-.65952,10.56457-.54572,18.27084a201.654,201.654,0,0,0,1.63351,22.88629,174.43178,174.43178,0,0,0,3.60474,19.749c.29123,1.19178.35239,1.44141.05383,1.91376h0Z", fill: "#f2f2f2" }),
            /* @__PURE__ */ jsx("path", { d: "M201.60414,422.19183c-.10278,0-.20679-.00244-.312-.00979-2.134-.115-4.11008-1.39246-5.87451-3.79563-.82715-1.13061-1.25052-2.42028-2.09482-4.99231a31.298,31.298,0,0,1-1.15387-5.17584c-.2533-1.8085-.22147-2.56467.13705-3.23276a3.8241,3.8241,0,0,1,1.76566-1.6127,1.41624,1.41624,0,0,1,.0979-.73907c.427-1.045,1.56253-.9079,2.17679-.84183a6.154,6.154,0,0,0,1.11716.06851,3.14893,3.14893,0,0,0,1.54785-.52127,6.96871,6.96871,0,0,1,2.096-.82471,7.47156,7.47156,0,0,1,3.94244.31324c2.71027.903,4.04645,3.01007,5.59308,5.44992a19.13477,19.13477,0,0,1,2.06543,4.71332,5.60412,5.60412,0,0,1,.28143,3.12753c-.30835,1.19668-1.03638,1.8819-2.88525,3.39429a33.608,33.608,0,0,1-3.732,2.85833c-1.93695,1.11838-3.15323,1.82071-4.76837,1.82071Z", fill: "#f2f2f2" }),
            /* @__PURE__ */ jsx("rect", { y: "535", width: "404", height: "2", fill: "#3f3d56" }),
            /* @__PURE__ */ jsx("polygon", { points: "94.084 525.181 111.331 525.179 119.535 458.655 94.08 458.656 94.084 525.181", fill: "#ffb6b6" }),
            /* @__PURE__ */ jsx("path", { d: "M153.1739,524.78961h0c.537.90442.82036,3.82349.82036,4.87525h0a5.85367,5.85367,0,0,1-5.85368,5.85369H94.72886a3.99339,3.99339,0,0,1-3.9934-3.9934v-2.2237s-2.64222-6.68341,2.79765-14.921c0,0,6.761,6.4502,16.86377-3.65252l2.97921-5.39707,21.56535,15.77182,11.95334,1.47131c2.61514.3219,4.93371-.04992,6.27891,2.21564Z", fill: "#2f2e41" }),
            /* @__PURE__ */ jsx("polygon", { points: "107.135 178.837 107.483 155.575 93.138 146.632 77.54 165.713 107.135 178.837", fill: "#ffb6b6" }),
            /* @__PURE__ */ jsx("polygon", { points: "107.135 178.837 108.063 156.154 93.138 146.632 98.209 174.703 107.135 178.837", opacity: "0.1", style: { "isolation": "isolate" } }),
            /* @__PURE__ */ jsx("circle", { cx: "107.17928", cy: "137.30127", r: "25.51205", fill: "#ffb6b6" }),
            /* @__PURE__ */ jsx("path", { d: "M141.97247,332.65726l-23.7656,161.722H88.38974l3.96481-92.31485,2.08673-48.53979-6.05153-23.1048a103.19271,103.19271,0,0,1-5.08353-11.36115c-2.62-7.02532-4.68934-15.44763-1.61721-19.4414,1.13032-1.47232,4.06915-2.56207,8.0629-3.37357a83.4388,83.4388,0,0,1,8.347-1.18826c17.6329-1.74475,42.71432-.655,42.71432-.655l.6376,21.04123.35361,11.74948.16809,5.4661Z", fill: "#2f2e41" }),
            /* @__PURE__ */ jsx("polygon", { points: "63.703 517.272 80.766 519.779 98.56 455.155 73.376 451.454 63.703 517.272", fill: "#ffb6b6" }),
            /* @__PURE__ */ jsx("path", { d: "M122.22131,525.47968h0c.39975.9729.25548,3.90216.1025,4.94274h0a5.85362,5.85362,0,0,1-6.64288,4.94l-52.84366-7.76911a3.99341,3.99341,0,0,1-3.37006-4.5318l.32345-2.20007s-1.642-6.99664,4.93826-14.35538c0,0,5.75091,7.365,17.2157-1.16073l3.73256-4.90632,19.04187,18.74091,11.6122,3.1944c2.54052.69885,4.88851.66821,5.88986,3.10534h.00021Z", fill: "#2f2e41" }),
            /* @__PURE__ */ jsx("path", { d: "M142.34653,305.68655l-3.25968,28.0723-17.77661,59.15588L92.047,490.30563l-29.49673-4.3348,26.473-138.47541L86.402,323.75064s-.85365-2.36026-1.83218-5.81567c-1.9423-6.836-4.37839-17.96851-1.6983-23.6471a6.63845,6.63845,0,0,1,1.37818-1.984c1.05414-1.02227,3.19659-1.64306,6.067-1.97235,11.99775-1.356,36.7064,2.52237,47.70111,4.42624l4.3287,10.92877Z", fill: "#2f2e41" }),
            /* @__PURE__ */ jsx("path", { d: "M80.81955,160.79143,109.802,174.703s30.72137,91.00486,30.72137,95.642,8.69473,7.53543,3.47789,12.75226,9.71,9.635,1.66692,13.802-58.21688,26.96048-63.796,24.905c-15.38743-5.669.65206-26.50018.65206-26.50018s-11.55873-9.30863-9.8198-13.9458-10.43368-93.32344-10.43368-93.32344l18.54876-27.24349Z", fill: "#e6e6e6" }),
            /* @__PURE__ */ jsx("path", { d: "M105.62127,143.41187l3.28137,6.56274s3.28137-11.813,8.53157-14.43805,5.90647-6.56274,5.90647-6.56274,6.56275,8.53157,11.15666,6.56274,6.56275-3.28137,1.31255-11.15667-3.93765-3.93765-3.93765-3.93765-4.59392-6.56275-3.93765-4.59392-3.93766-5.2502-3.93766-3.28137-3.28137-3.93765-3.28137-1.96882-13.78177-4.59392-11.81295-1.96882-11.81295-5.2502-18.3757,5.2502-15.66275,8.55856-12.4253,15.10783S80.0265,153.256,80.0265,153.256h9.05092s9.32479-17.71942,16.5438-9.84411Z", fill: "#2f2e41" }),
            /* @__PURE__ */ jsx("path", { d: "M346.52728,253.38432l-.28.09-15.24,4.71-174.01,53.82c18.43-13.28,22.34-92.1,17.7-127.93,26.79,48.68,70.52,19.11,123.98-65.7,13.99-22.2,28.66-48.2,43.85-77.57l2.71,144.11Z", fill: "#f9a826" }),
            /* @__PURE__ */ jsx("path", { id: "afd17dae-8948-4aa9-b2b8-cc47c0744a3c-666", "data-name": "uuid-e967cc2e-cf82-40ad-a893-bd90ae03d296-50", d: "M169.1319,240.98085c7.19282-2.125,14.11967-.13621,15.4713,4.44157s-3.38349,10.01-10.57917,12.13486a18.76994,18.76994,0,0,1-8.84762.55329l-30.59,8.61892-3.73863-14.44122,30.55328-6.96353a18.77141,18.77141,0,0,1,7.73088-4.34387Z", fill: "#ffb6b6" }),
            /* @__PURE__ */ jsx("path", { d: "M115.026,189.80144l-4.79452,57.35765,42.94631.46177,8.3349,12.83419s-52.05339,30.13989-67.68354,14.73938-22.58474-80.20734-8.68819-91.30036S115.026,189.80144,115.026,189.80144Z", fill: "#e6e6e6" }),
            /* @__PURE__ */ jsx("path", { d: "M215.45541,167.71068l-10.31294-3.1828c4.75566,4.95579,9.41072,13.09492,12.22655,19.69949,2.17146-6.84271,6.02984-15.38829,10.29156-20.77476l-9.82544,4.09451c1.84928-31.71967,22.31153-57.24717,49.39215-61.14752l.22306-1.16823c-28.28641,4.074-50.19258,29.49647-51.99492,62.47929Z", fill: "#3f3d56" }),
            /* @__PURE__ */ jsx("path", { d: "M228.4429,257.25964l5.50089-9.08363c-5.86605,3.35577-14.74657,5.85529-21.72312,6.96573,6.0128,3.7068,13.24816,9.43046,17.37178,14.78465l-1.56176-10.35623c29.83488,9.3403,49.31425,34.96793,46.56987,61.74789l1.06179.49189C278.52893,293.83752,259.49466,266.85675,228.4429,257.25964Z", fill: "#3f3d56" }),
            /* @__PURE__ */ jsx("path", { d: "M346.24731,253.47429l-15.24,4.71c-12.64-7.56-25.88-13.71-39.04-19.72-4.52-2.06006-9.65-4.93-10.86-10.85-.73-3.53.2-7.28,1.46-10.56,7.03-18.36,23.97-28.8,29.14-48.15,4.75-17.8-2.32-36.96-13.03-50.53,13.99-22.2,28.66-48.2,43.85-77.57l2.71,144.11C345.63732,212.31431,346.00732,237.08433,346.24731,253.47429Z", fill: "#f1f2f2" })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-12 lg:py-24 bg-primary text-primary-foreground", id: "features", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto", children: [
      /* @__PURE__ */ jsx("header", { children: /* @__PURE__ */ jsx("h2", { className: "mb-8 text-3xl font-bold", children: "What we offer ❤️" }) }),
      /* @__PURE__ */ jsx("ul", { className: "grid grid-cols-1 gap-6 lg:grid-cols-3", children: features.map((feature) => /* @__PURE__ */ jsxs("li", { className: "p-8 text-black bg-white border border-gray-200 rounded-md shadow-sm", children: [
        /* @__PURE__ */ jsx(
          feature.icon,
          {
            className: "mb-6 w-14 h-14 text-rose-400"
          }
        ),
        /* @__PURE__ */ jsx("h3", { className: "mb-2 text-lg font-medium", children: feature.name }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: feature.description })
      ] }, feature.name)) })
    ] }) }),
    /* @__PURE__ */ jsx(
      ShowcaseSection,
      {
        title: "Create your apps 📱",
        description: "We'll use your app as context whenever curating SEO optimized content for you. Personalized and professional.",
        features: [
          "Create your app.",
          "Personalize your app.",
          "Choose your app's main language.",
          "Set your target audience.",
          "See our AI curate content for your app.",
          "You can edit your app at any time later."
        ],
        image: /* @__PURE__ */ jsx(
          "img",
          {
            className: "object-cover w-full",
            src: "https://rankrover.ai/images/create_app.png",
            alt: ""
          }
        ),
        ctas: /* @__PURE__ */ jsx(Button, { size: "lg", asChild: true, children: current_user ? /* @__PURE__ */ jsx(Link, { href: "/apps", children: "Go to app 🌟" }) : /* @__PURE__ */ jsx(Link, { href: "/register", children: "Get started 🌟" }) })
      }
    ),
    /* @__PURE__ */ jsx(
      ShowcaseSection,
      {
        className: "text-black bg-rose-50",
        reverse: true,
        title: "Let our AI curate your content 🤖",
        description: "Our AI will create your content like you want it, for your target audience.",
        features: [
          "Choose from a hundred languages.",
          "Decide your type of content, whether it be a blog post or listicle.",
          "Let our AI recommend titles and keywords, or choose yourself.",
          "Set the length you want for your content.",
          "Toggle whether you want to only use your target audience as context (create more generic content).",
          "You can revise your content later."
        ],
        image: /* @__PURE__ */ jsx(
          "img",
          {
            className: "object-cover w-full",
            src: "https://rankrover.ai/images/create_content.png",
            alt: ""
          }
        ),
        ctas: /* @__PURE__ */ jsx(Button, { size: "lg", asChild: true, children: current_user ? /* @__PURE__ */ jsx(Link, { href: "/apps", children: "Go to app 🌟" }) : /* @__PURE__ */ jsx(Link, { href: "/register", children: "Get started 🌟" }) })
      }
    ),
    /* @__PURE__ */ jsx(
      ShowcaseSection,
      {
        largeImage: true,
        title: "Choose from our AI's 🤖 recommendations",
        description: "With AutoPilot our AI will create a cluster of recommendations. Pick and choose.",
        features: [
          "Let our AutoPilot recommend content.",
          "Choose which ones you want our AI to write.",
          "Our AI will write your content simultaneously.",
          "We'll keep you updated on the status of your content.",
          "You can always revise your content later after it's been written."
        ],
        image: /* @__PURE__ */ jsx(
          "img",
          {
            className: "object-cover w-full",
            src: "https://rankrover.ai/images/content_cluster.png",
            alt: ""
          }
        ),
        ctas: /* @__PURE__ */ jsx(Button, { size: "lg", asChild: true, children: current_user ? /* @__PURE__ */ jsx(Link, { href: "/apps", children: "Go to app 🌟" }) : /* @__PURE__ */ jsx(Link, { href: "/register", children: "Get started 🌟" }) })
      }
    ),
    /* @__PURE__ */ jsx(
      ShowcaseSection,
      {
        className: "text-black bg-rose-50",
        reverse: true,
        title: "Revise & tweak your content ",
        description: "Talk to our AI to revise your content, improving on it and making it even more suitable to your exact needs.",
        features: [
          "Write your tweaks to our AI.",
          "Let our AI do the job of updating your content.",
          "Continue tweaking & revising your content.",
          "Jump between the different versions of content."
        ],
        image: /* @__PURE__ */ jsx(
          "img",
          {
            className: "object-cover w-full",
            src: "https://rankrover.ai/images/tweak_content.png",
            alt: ""
          }
        ),
        ctas: /* @__PURE__ */ jsx(Button, { size: "lg", asChild: true, children: current_user ? /* @__PURE__ */ jsx(Link, { href: "/apps", children: "Go to app 🌟" }) : /* @__PURE__ */ jsx(Link, { href: "/register", children: "Get started 🌟" }) })
      }
    ),
    /* @__PURE__ */ jsx("section", { className: "py-12 text-black bg-white lg:py-24", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto", children: [
      /* @__PURE__ */ jsx("header", { children: /* @__PURE__ */ jsx("h2", { className: "mb-8 text-3xl font-bold", children: "Get started today 🚀" }) }),
      /* @__PURE__ */ jsx(
        PricingGrid,
        {
          prices: subscription_plans
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-12 text-black bg-rose-50 lg:py-24", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto", children: [
      /* @__PURE__ */ jsx("header", { children: /* @__PURE__ */ jsx("h2", { className: "mb-8 text-3xl font-bold", children: "Latest from us 🌍" }) }),
      /* @__PURE__ */ jsx("ul", { className: "grid grid-cols-1 gap-6 lg:grid-cols-3", children: articles.map((article) => /* @__PURE__ */ jsxs("li", { className: "flex flex-col bg-white border border-gray-200 rounded-md shadow-sm", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            className: "object-cover w-full h-56",
            src: `https://meldsmitte.no/images/blog/${article.poster}`,
            alt: article.slug
          }
        ),
        /* @__PURE__ */ jsxs("main", { className: "flex-1 px-4 py-6 lg:p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "mb-2 font-medium text-md", children: article.title }),
          /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-muted-foreground", children: article.ingress })
        ] }),
        /* @__PURE__ */ jsx("footer", { className: "px-4 pb-4 lg:p-6", children: /* @__PURE__ */ jsx(Button, { className: "w-full", size: "lg", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: `/blog/${article.slug}`, children: "Read more" }) }) })
      ] }, article.title)) })
    ] }) })
  ] });
}
export {
  HomePage as default
};
