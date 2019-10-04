<template>
  <ul>
    <li v-for="(post, index) in posts" :key="index">
      <nuxt-link :to="{ name: 'id', params: { id: post.id } }">
        <div>{{ post.id }}</div>
        <div>{{ post.title }}</div>
        <!-- <div>{{ post.contents }}</div> -->
        <div>
          <div><img :src="post.url" :alt="post.alt" /></div>
        </div>
        <div>{{ post.post_date }}</div>
        <div>{{ post.categorys }}</div>
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>

<style></style>
