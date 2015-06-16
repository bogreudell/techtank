<?php include_once "header.php"; ?>

    <body>

		<div class="btnbar">
			<p id="qcount"></p>

			<a id="nextbtn" onclick="">NEXT</a>

			<div id="question"></div>
		</div>

		<div class="container">

			<div class="datacollection">
				<form id="fiveptscale1" class="fiveptscale" action="csv_2a.php" method="POST">
					<ul class="fiveptlistec" id="listtime"></ul>
				</form>
			</div>

		</div>
    </body>

    <script type="text/javascript">
        // Submit 5 PT Scale Forms
        $("#nextbtn").click(function() {
            $("#fiveptscale1").submit();
            return false;
        });
    </script>
<?php include_once "footer.php"; ?>
