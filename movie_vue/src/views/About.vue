<template>
  <div>
    <h1 class="display-1"><strong>About US</strong></h1>
    <div class="container w-75">
      <h4>A space to share the taste and discourse of the movies</h4>
      <h4 class="font-italic explanation">founded by Bradley and Isaac</h4>
      <hr>
      <div class="row">
        <img src="@/assets/sm.jpg" width="100px" alt="sm image" class="col-4">
        <div class="col-8 d-flex flex-column justify-content-between">
          <h4 class="display-4">Bradley</h4>
          <br>
          <h4 class="detail mx-auto">"JOHN G. RAPED AND MURDERED MY WIFE"</h4>
        </div>
      </div>
      <hr>
      <div class="row">
        <div class="col-8 d-flex flex-column justify-content-between">
          <h4 class="display-4">Isaac</h4>
          <h4 class="detail mx-auto">"We're all traveling through time together,</h4>
          <h4 class="detail mx-auto">every day of our lives.</h4>
          <h4 class="detail mx-auto">All we can do is do our best</h4>
          <h4 class="detail mx-auto">to relish this remarkable ride."</h4>
          <!-- <h4 class="detail mx-auto">"Remember Red.</h4>
          <h4 class="detail mx-auto">Hope is a godo thing,</h4>
          <h4 class="detail mx-auto">maybe the best of things</h4>
          <h4 class="detail mx-auto">and no good thing ever dies."</h4> -->
        </div>
        <img src="@/assets/sh.png" width="100px" alt="sh image" class="col-4">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
}
</script>

<style scoped>
.explanation {
  font-weight: lighter;
}
.detail {
  font-weight: lighter;
}
</style>