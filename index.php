<?php include_once "header.php"; ?>
		<div class="btnbar nav-down">
			<p id="qcount"></p>

			<a id="nextbtn" onclick="">NEXT</a>

			<div id="question"></div>

		</div>

		<div class="container">
			<div class="datacollection">

                <form id="form1" action="csv_1.php" method="POST">
					<ul class="list">
					</ul>
				</form>

				<form class="myform">
					<input id="singlein" class="in" type="text" placeholder="Username" onFocus="" onChange=""></input>
				</form>

			</div>
		</div>

    </body>

<script type="text/javascript">

    $("#nextbtn").click(function() {
        $("#form1").submit();
        return false;
    });
    
</script>

<?php include_once "footer.php"; ?>
