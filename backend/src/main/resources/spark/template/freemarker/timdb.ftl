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
    <link rel="stylesheet" href="css/timdb.css">
  </head>
  <body>
    <div class="timdb-body">
      <h1> Connect Actors (Load Database in REPL)</h1>
          <form method="GET" action="/connect">
            <div id="flexbox">
              <div class="actor1">
                <label for="actor1Text">Actor 1</label><br>
                <textarea placeholder="ex &quot;Samuel L. Jackson&quot;" name="connect-text1"
                          id="actor1Text"></textarea><br>
              </div>
              <div class="actor2">
                <label for="actor2Text">Actor 2 </label><br>
                <textarea placeholder="ex &quot;Sylvester Stallone&quot;" name="connect-text2"
                          id="actor2Text"></textarea><br>
              </div>
            </div>
            <input type="submit">
          </form>
          </p>
      <h3> Connection (actor1 -> actor2 : film): </h3>
      <p class="timdbResults" id="timdbResultsId">${timdbResults}<p>
    </div>
  </body>
</html>
