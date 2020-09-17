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
    <link rel="stylesheet" href="css/stars.css">
  </head>
  <body>
    <div class="stars-body">
      <h1> Find Stars (Load Data in REPL)</h1>
      <div id="flexbox">
        <div class="neighbors">
          <form method="GET" action="/neighbors">
            <label for="neighborsText">Neighbors Search </label><br>
            <textarea placeholder="neighbors <k> <name/coordinate>" name="text" id="neighborsText"></textarea><br>
            <input type="submit">
          </form>
          </p>
        </div>

        <div class="radius">
          <form method="GET" action="/radius">
            <label for="radiusText">Radius Search </label><br>
            <textarea placeholder="radius <r> <name/coordinate>" name="text" id="radiusText"></textarea><br>
            <input type="submit">
          </form>
          </p>
        </div>
      </div>
      <h3> Results (ID|Name): </h3>
      <p class="results" id="resultsID">${results}<p>
    </div>
  </body>
</html>
