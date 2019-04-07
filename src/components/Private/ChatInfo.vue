<template>
  <div class="right-side">
    <div class="top">
      <span class="name">Maksim Ivanov</span>
      <p class="desc">Дата первого обращения</p>
      <span class="date">18.04.2019</span>
      <hr>
    </div>
    <div class="overflow-auto">
      <div class="information">
        <span class="title">Information</span>
        <p class="items">Sex: Male</p>
        <p class="items">Region: Moscow</p>
        <p class="items">Email: maksim@example.com</p>
        <p class="items">Phone: +7(708)32-32-2</p>
        <hr>
      </div>
      <div class="actions">
        <span class="title">Actions</span>
        <div class="buttons">
          <button class="btn btn-red">Add to spam</button>
          <button class="btn btn-blue">Send dialog via Email</button>
          <button class="btn btn-blue">Add contact information</button>
        </div>
      </div>
      <div class="categories">
        <p class="title">Setup categorie</p>
        <div class="colors">
          <div class="color color-white"></div>
          <div class="color color-green"></div>
          <div class="color color-blue"></div>
          <div class="color color-red active"></div>
          <div class="color color-pink"></div>
          <div class="color color-orange"></div>
          <div class="color color-purple"></div>
          <div class="color color-black"></div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'ChatInfo'
  }
</script>
