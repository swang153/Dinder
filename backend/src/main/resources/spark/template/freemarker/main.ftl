<!DOCTYPE html>
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- In real-world webapps, css is usually minified and
         concatenated. Here, separate normalize from our code, and
         avoid minification for clarity. -->
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/html5bp.css">
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">

  </head>
  <body>
        <h1 class="main-h1">Welcome! Please Select a Program Below</h1>
        <div class="main-flex">
          <div class="main-stars">
            <form method="GET" action="/stars">
              <input type="submit" value="Stars" />
            </form>
          </div>
          <div method="GET" class="main-timdb">
            <form action="/timdb">
              <input type="submit" value="Timdb" />
            </form>
          </div>
        </div>
     <!-- Again, we're serving up the unminified source for clarity. -->
     <script src="js/jquery-2.1.1.js"></script>
  </body>
  <!-- See http://html5boilerplate.com/ for a good place to start
       dealing with real world issues like old browsers.  -->
</html>
