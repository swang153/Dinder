<#assign content>

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

</#assign>
<#include "main.ftl">
