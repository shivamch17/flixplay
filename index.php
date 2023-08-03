<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Xaamp</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="assets/css/styles.css">

</head>

<body style="background: var(--bs-dark);">
    <nav class="navbar navbar-light navbar-expand-md" style="background: var(--bs-dark);padding: 4px 0px;">
        <div class="container-fluid"><a class="navbar-brand" href="#" style="font-family: Ibarra Real Nova;font-size: 24px;color: var(--bs-white);text-align: center;letter-spacing: 0px;"><img src="assets/img/logo.png" style="/*border-width: 20px;*/width: 42px;height: 42px;margin: 0px;padding: 0px;"><strong>FLIXPLAY</strong></a><button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navcol-1" style="background: var(--bs-red);"><span class="visually-hidden">Toggle navigation</span><span class="navbar-toggler-icon" style="border-width: 2px;border-color: var(--bs-blue);"></span></button>
            <div class="collapse navbar-collapse d-md-flex d-lg-flex justify-content-between align-items-md-center align-items-lg-center" id="navcol-1">
                <div>
                    <ul class="navbar-nav d-md-flex justify-content-md-end align-items-md-center">
                        <li class="nav-item"><a class="nav-link" href="#" style="color: var(--bs-white);background: var(--bs-gray-dark); margin:2px; text-align: center; border-radius: 35px;" id="movies-list">Movies</a></li>
                        <li class="nav-item"><a class="nav-link" href="#" style="color: var(--bs-white);background: var(--bs-gray-dark); margin:2px; text-align: center; border-radius: 35px;" id="tvshows-list">TV Shows</a></li>
                        <!-- <li class="nav-item"><a class="nav-link" href="#" style="color: var(--bs-white);background: var(--bs-gray-dark); margin:2px; text-align: center; border-radius: 35px;" id="livetv-list">Live TV</a></li> -->
                        <li class="nav-item"><a class="nav-link" href="https://github.com/shivamch17/flixplay" style="color: var(--bs-white);background: var(--bs-gray-dark); margin:2px; text-align: center; border-radius: 35px;" id="livetv-list">Github</a></li>
                    </ul>
                </div>
                <div>
                    <!-- <form class="me-auto" target=""> -->
                        <div class="d-flex justify-content-center align-items-center align-items-sm-center" style="text-align: center;">
                          <input class="form-control search-field" type="title" id="search-field" style="width: 220px;border-radius: 50px;" placeholder="Search...">
                          <button class="btn btn-light" id="searchbtn" style="background: var(--bs-red); margin: 3px;border-radius: 50px;">Search&nbsp;</button>
                        </div>
                    <!-- </form> -->
                </div>
            </div>
        </div>
    </nav>
    <section class="header"><span style="line-height: 41px;font-size: 22px;text-align: center;color: var(--bs-light);"></span></section>
    <h2 class="hidden h2">Popular Movies</h2>
    <div id="movie-container" class="main"></div>
    <h2 class="hidden h2">Popular TV-Shows</h2>
    <div id="series-container" class="main"></div>
    <div class="container">
      <div class="loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <button class="btn btn-light" id="load-more" style="background: var(--bs-red);" href="#">LOAD MORE</button>
    </div>

<!-- MODAL -->
    <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
  <div class="modal-dialog modal-lg">
    <div class="modal-content" style="background: var(--bs-dark);">
      <div class="modal-header bg-danger">
        <h5 class="modal-title" id="exampleModalToggleLabel" style="color: var(--bs-white);"></h5>
        <button type="button" class="btn-close" id="btnClose" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>


      <div class="modal-body" id="modalBody1"></div>  <!-- Append Here-->
      
      
      <div class="modal-footer">
        <button class="btn btn-danger" id="playeropen" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">Watch Now</button>
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
  <div class="modal-dialog modal-xl">
    <div class="modal-content" style="background: var(--bs-dark);">
      <div class="modal-header bg-danger">
        <h5 class="modal-title" id="exampleModalToggleLabel2" style="color: var(--bs-white);">PLAYER</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      
      
      <div class="modal-body" id="modalBody2"></div>  <!-- Append Here-->
      
      
      <div class="modal-footer">
        <button class="btn btn-danger" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Back To Details</button>
      </div>
    </div>
  </div>
</div>
<a class="btn btn-primary details-display hidden" data-bs-toggle="modal" href="#exampleModalToggle" role="button"></a>
<!-- MODAL END -->

    <script src="assets/js/app.js"></script>
</body>

</html>