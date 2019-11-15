<template>
  <div class="info">
    <h1
      class="name"
      :style="{ 'letter-spacing': `${letterSpacing}px`, 'opacity': opacity }"
    >{{ name ? name.map(item => item.text).join('') : '' }}</h1>
    <h3>Fullstack Engineer / Systems Administrator</h3>
  </div>
</template>

<script>
export default {
  name: "info",
  data() {
    return {
      opacity: 0,
      letterSpacing: 1,
      originalName: [],
      name: []
    };
  },
  async mounted() {
    let int = setInterval(async () => {
      await this.sleep(5);
      this.opacity = this.opacity + 0.1;
      if (this.opacity >= 1) return clearInterval(int);
    }, 100);

    await this.updateName();

    let generate = await this.generateHangman("Dustin Rouillard");
    this.name = generate.items;
    this.originalName = generate.originalItems;

    // Wait 10 seconds and playHangman
    setTimeout(async () => {
      await this.playHangman();
    }, 2500);
  },
  methods: {
    async randomize(array) {
      for (let i = array.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }

      return array;
    },

    async generateHangman(string) {
      let items = [];
      let originalItems = [];

      for (let i = 0; i < string.length; i++) {
        items.push({ position: i, text: `${string[i] == " " ? " " : "_"}` });
        originalItems.push({ position: i, text: string[i] });
      }

      originalItems = await this.randomize(originalItems);

      return { items, originalItems };
    },

    async getLetters(letter) {
      return this.originalName.filter(
        item => item.text.toLowerCase() == letter.toLowerCase()
      );
    },

    async playHangman() {
      for (let i = 0; i < this.name.length; i++) {
        let letters = await this.getLetters(this.originalName[i].text);

        await this.sleep(200);
        for (let o = 0; o < letters.length; o++) {
          let itemToChange = await this.name.filter(
            item => item.position == letters[o].position
          );

          itemToChange.forEach(item => {
            item.text = letters[o].text;
          });

          continue;
        }

        if (i + 1 >= this.name.length) {
          setTimeout(async () => {
            await this.shortenName();
          }, 350);
        }

        continue;
      }
    },

    async sleep(int) {
      return new Promise(resolve => setTimeout(resolve, int));
    },

    async updateName() {
      setTimeout(async () => {
        await this.expandName();
      }, 700);
    },

    async expandName() {
      let int = setInterval(() => {
        this.letterSpacing = this.letterSpacing + 0.07;
        if (this.letterSpacing >= 10) return clearInterval(int);
      }, 10);
    },

    async shortenName() {
      let int = setInterval(() => {
        this.letterSpacing = this.letterSpacing - 0.06;
        if (this.letterSpacing <= 3) return clearInterval(int);
      }, 10);
    }
  }
};
</script>