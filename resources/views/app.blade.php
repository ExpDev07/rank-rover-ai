<!DOCTYPE html>
<html lang="nb">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

    <link rel="icon" type="image/x-icon" href="/images/logo.png">

    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    @inertiaHead
  </head>
  <body class="font-sans antialiased">
    @inertia

    <script async src="https://www.googletagmanager.com/gtag/js?id=G-YK9B544JLX"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-YK9B544JLX');
    </script>
  </body>
</html>
