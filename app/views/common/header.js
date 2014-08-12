<html>
<head>
	<title>Stop Living Check to Check</title>	
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" type="text/css" href="css/normalize.css">
  <link rel="stylesheet" type="text/css" href="css/bootstrap.css">
  <link rel="stylesheet" type="text/css" href="css/style.css">
   <link rel="stylesheet" type="text/css" href="css/jquery-ui-1.10.3.custom.css">
   <link rel="stylesheet" type="text/css" href="css/pikaday.css">
	
 
   <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
   <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
   <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
   <![endif]-->
</head>
<body>

<script type="text/x-handlebars" id="App" data-template-name="application">
 <div class="navbar navbar-inverse">
    <div class="navbar-inner">
    
      <ul class="nav navbar-nav navbar-right">
        <li>{{#link-to 'index'}}Home{{/link-to}}</li>
        <li>{{#link-to 'getting started'}}Get Started{{/link-to}}</li>
        <li class="dropdown">
          <a href="#"  class="dropdown-toggle" data-toggle="dropdown">Financials</a>
            <ul class="dropdown-menu" role="menu">
              <li>{{#link-to "incomeOverview"}}My Income{{/link-to}}</li>
              <li>{{#link-to "expensesOverview"}}My Expenses{{/link-to}}</li>
            </ul>
        </li>
        <li>{{#link-to 'reports'}}Reports{{/link-to}}</li>
        <li>{{#link-to 'contact'}}Contact{{/link-to}}</li>
        
      </ul>
    </div>
  </div>

<div id="sideNavFixed">
  <div class="menuButton">
    <button class="glyphicon glyphicon-list listSideNav menuButton" data-toggle="modal" data-target="#settingsModal"></button>
  </div>