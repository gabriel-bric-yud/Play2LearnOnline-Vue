<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto text-left">
          <li class="nav-item active">
            <a class="nav-link" href="/">Home</a>
          </li>
        </ul>
      </div>
      <a class="navbar-brand" href="/">Mathificent</a>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'HeaderNavBar',
};
</script>
