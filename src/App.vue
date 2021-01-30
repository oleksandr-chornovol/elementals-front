<template>
  <img alt="chuck" src="https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png"/>
  <div class="joke">{{ joke.value }}</div>
  <button class="refresh"
          @click="getRandomJoke"
  >Refresh</button>
  <div v-for="comment in joke.comments"
       :key="comment.id"
       class="comments"
  >
    <span class="comment">{{comment.text}}</span>
    <button class="rm-comment"
            @click="removeComment(comment.id)"
    >Remove</button>
  </div>
  <div class="add-comment">
    <input placeholder="Comment..."
           v-model="newComment"/>
    <button @click="addComment">Send</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      joke: {},
      newComment: ''
    }
  },
  mounted () {
    this.getRandomJoke()
  },
  methods: {
    addComment () {
      this.axios.post('jokeComment', {
        'joke_id': this.joke.id,
        'text': this.newComment
      }).then((response) => {
        this.joke.comments.push(response.data)
        this.newComment = ''
      })
    },
    getRandomJoke () {
      this.axios.get('getRandomJoke').then((response) => this.joke = response.data)
    },
    removeComment (commentId) {
      this.axios.delete(`/jokeComment/${commentId}`).then(() => {
        this.joke.comments = this.joke.comments.filter(c => c.id !== commentId)
      })
    }
  }
}
</script>

<style>
img {
  width: 300px;
  margin: 25px auto;
  display: block;
}

.joke {
  margin: 40px auto 5px;
  padding: 10px;
  width: 300px;
  text-align: center;
  border: 1px solid black;
  border-radius: 25px;
}

.refresh {
  margin: 0 auto 15px;
  text-align: center;
  display: block;
}

input {
  width: 300px;
}

.add-comment {
  width: 300px;
  margin: 10px auto;
  right: 0;
  left: 0;
  display: flex;
}

.comments {
  margin: 10px auto;
  width: 300px;
  right: 0;
  left: 0;
  background-color: lightgrey;
  padding-left: 12px;
  border-radius: 10px;
  display: flex;
}

.comment {
  width: 350px;
  padding: 3px;
}

.rm-comment {
  height: 25px;
  padding: 3px;
  border-radius: 0 10px 10px 0;
}
</style>
