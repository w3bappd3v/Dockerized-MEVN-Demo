<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">

  html{ height: 100vh; overflow: auto; }

  body {
    background: #dccfc3;
    height: 100vh;
    margin: 0;
    padding: 0;
    overflow: auto;
  }
  #app {
    @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap');
    font-family: 'Ubuntu', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    border: 1px solid #7e7e7e;
    color: #333333;
    height: fit-content;
    min-height: 100vh;
    margin: 0 auto;
    max-width: 1200px;
    border-top: none;
    border-bottom: none;
    min-width: 307px;
    padding: 20px;
    background: #fff;
  }

  button {
    height: 36px;
    border: none;
    border-radius: 6px;
    background: #bdbdbd;
    padding: 0 20px;
    outline-color: #fff;
  }

  button:hover {
    background: #829fdd;
    cursor: pointer;
    color: #fff;
    outline-color: #829fdd;
  }

  #nav {
    padding: 10px;

    a {
      font-weight: bold;
      color: $font-color-a;
      font-size: 1.5em;
      text-decoration: none;
      
      &.router-link-exact-active {
        color: $font-color-a;
      }
    }

    a:hover {
      text-shadow: 1px 1px 3px #9e9e9ebf;
    }

  }
  
</style>