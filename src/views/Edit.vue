<template>
  <div>
    <p>Editing NFT for wallet address: {{ walletAddress }}</p>
    <button @click="openModal">Select NFT</button>
    <div id="myModal" class="modal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div
          class="image-container"
          :class="{ selected: selectedImage === image }"
          v-for="(image, index) in images"
          :key="index"
          @click="selectImage(image)"
        >
          <img :src="image" alt="Sample Image" width="200" />
        </div>
      </div>
    </div>
    <div class="display">
      <canvas id="myCanvas" ref="myCanvas" class="my-canvas"></canvas>
    </div>
    <div class="edit">
      <!-- <form>
        <input id="input-file" type="file" @change="handleFileChange" />
        <input type="submit" />
      </form> -->
      <form class="face__container" id="faces">
        <div class="face__item">
          <img class="face__item-img" id="preview-1" />
          <input
            class="face__item-input"
            id="select1"
            name="number"
            type="radio"
            value="1"
            checked
          />
        </div>
        <div class="face__item">
          <img class="face__item-img" id="preview-2" />
          <input
            class="face__item-input"
            id="select2"
            name="number"
            type="radio"
            value="2"
          />
        </div>
        <div class="face__item">
          <img class="face__item-img" id="preview-3" />
          <input
            class="face__item-input"
            id="select3"
            name="number"
            type="radio"
            value="3"
          />
        </div>
        <div class="face__item">
          <img class="face__item-img" id="preview-4" />
          <input
            class="face__item-input"
            id="select4"
            name="number"
            type="radio"
            value="4"
          />
        </div>
        <div class="face__item">
          <img class="face__item-img" id="preview-5" />
          <input
            class="face__item-input"
            id="select5"
            name="number"
            type="radio"
            value="5"
          />
        </div>
        <div class="face__item">
          <img class="face__item-img" id="preview-6" />
          <input
            class="face__item-input"
            id="select6"
            name="number"
            type="radio"
            value="6"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default {
  name: "MyEdit",
  computed: {
    ...mapGetters("nft", ["walletAddress"]),
  },
  data() {
    return {
      showModal: false,
      selectedImage: null,
      images: [
        "https://ipfs.thirdwebcdn.com/ipfs/QmTEYP9HBsRHfL7VgUT6DpAdSXZnPRJM9HqJTaQ2UA9ZDY/0.png",
        "https://ipfs.thirdwebcdn.com/ipfs/QmVPuaQLfQ8vzpSECF9GbivU9EXAW7uA5qJzJ4CWR7DtrG/1.png",
      ],
      colors: [
        "#FDDE00",
        "#ffffff",
        "#004AC3",
        "#178A28",
        "#F8030A",
        "#FF8006",
      ],
      imgUrls: ["", "", "", "", "", ""],
      material: [],
    };
  },
  mounted() {
    this.initThree();
  },
  methods: {
    openModal() {
      this.showModal = true;
      document.body.style.overflow = "hidden";
    },
    closeModal() {
      this.showModal = false;
      document.body.style.overflow = "auto";
    },
    selectImage(image) {
      this.selectedImage = image;
      this.showModal = false;
      this.initThree(this.selectedImage);
    },
    initThree(selectImage) {
      // シーンを作成
      const scene = new THREE.Scene();

      // カメラを作成
      const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / 2 / window.innerHeight,
        1,
        10000
      );
      camera.position.set(0, 0, 1000);

      // 平行光源を作成
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(0, 0, 1000);
      scene.add(directionalLight);

      // WebGLレンダラーを作成
      const renderer = new THREE.WebGLRenderer({ canvas: this.$refs.myCanvas });
      renderer.setClearColor(0xffffff);
      renderer.setSize(window.innerWidth / 2, window.innerHeight);

      // 滑らかにカメラコントローラーを制御する
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.2;

      // ジオメトリを作成
      const geometry = new THREE.BoxGeometry(300, 300, 300);

      // 画像を貼り付けるとき
      const loadPic = new THREE.TextureLoader();

      // メッシュを作成
      const cube = new THREE.Mesh(geometry, this.material);

      // テクスチャーを更新する
      const updateMesh = () => {
        for (let i = 0; i < 6; i++) {
          if (this.imgUrls[i] !== "") {
            const texture = loadPic.load(this.imgUrls[i]);
            texture.minFilter = THREE.LinearFilter;
            cube.material[i] = new THREE.MeshBasicMaterial({ map: texture });
            // プレビューの表示
            const previewImg = document.getElementById("preview-" + (i + 1));
            previewImg.src = this.imgUrls[i];
          } else {
            cube.material[i] = new THREE.MeshBasicMaterial({
              color: this.colors[i],
            });
            const img = new Image();
            img.addEventListener("load", () => {
              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d");
              canvas.width = 512;
              canvas.height = 512;
              ctx.fillStyle = this.colors[i];
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              this.imgUrls[i] = canvas.toDataURL();
              // プレビューの表示
              const previewImg = document.getElementById("preview-" + (i + 1));
              previewImg.src = this.imgUrls[i];
            });
            img.src =
              "https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png";
          }
        }
      };

      // const file = document.getElementById("input-file");

      // const updateImage = (input, number) => {
      //   const file = input.files[0];
      //   if (!file) return;

      //   const reader = new FileReader();
      //   reader.addEventListener("load", () => {
      //     const img = new Image();
      //     img.addEventListener("load", () => {
      //       // 画像のサイズを調整
      //       const MAX_SIZE = 512;
      //       let width = img.width;
      //       let height = img.height;
      //       if (width > MAX_SIZE || height > MAX_SIZE) {
      //         if (width > height) {
      //           height *= MAX_SIZE / width;
      //           width = MAX_SIZE;
      //         } else {
      //           width *= MAX_SIZE / height;
      //           height = MAX_SIZE;
      //         }
      //       }
      //       const canvas = document.createElement("canvas");
      //       const ctx = canvas.getContext("2d");
      //       canvas.width = 512;
      //       canvas.height = 512;

      //       const index = ["1", "2", "3", "4", "5", "6"].indexOf(number);
      //       // 画像を貼り付ける
      //       const preImg = new Image();
      //       preImg.addEventListener("load", () => {
      //         ctx.drawImage(preImg, 0, 0, canvas.width, canvas.width);
      //         ctx.drawImage(img, 0, 0, width, height);
      //         this.imgUrls[index] = canvas.toDataURL();
      //         // テクスチャーを更新
      //         updateMesh();
      //       });
      //       preImg.src = this.imgUrls[index];
      //     });
      //     img.src = reader.result;
      //   });
      //   reader.readAsDataURL(file);
      // };

      // // ファイルが選択されたら実行
      // file.addEventListener("change", (event) => {
      //   const number = document.querySelector(
      //     '.face__container input[name="number"]:checked'
      //   ).value;
      //   updateImage(event.target, number);
      // });

      const updateImage = (selectImage, number) => {
        const index = ["1", "2", "3", "4", "5", "6"].indexOf(number);
        this.imgUrls[index] = selectImage;
        // テクスチャーを更新
        updateMesh();
      };
      const number = document.querySelector(
        '.face__container input[name="number"]:checked'
      ).value;
      if (selectImage) {
        updateImage(selectImage, number);
      }

      // シーンにメッシュを追加
      scene.add(cube);

      // アニメーション関数
      const animate = () => {
        requestAnimationFrame(animate);

        // 立方体を回転させる
        cube.rotation.x += 0.001;
        cube.rotation.y += 0.001;

        // レンダリング
        renderer.render(scene, camera);
      };

      // アニメーションを開始
      animate();

      // テクスチャーを更新する
      updateMesh();
    },
  },
  watch: {
    showModal(val) {
      const modal = document.getElementById("myModal");
      if (val) {
        modal.style.display = "block";
      } else {
        modal.style.display = "none";
      }
    },
  },
};
</script>

<style>
.modal {
  display: none;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  position: relative;
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.image-container {
  margin: 10px;
  cursor: pointer;
}

.selected {
  border: 3px solid #00f;
}

.edit {
  position: fixed;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  padding: 80px 4vw 80px 0;
  z-index: 10;
  background: #e5e5e5;
}

.face__container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 24px;
}
.face__item {
  display: flex;
  flex-direction: column;
}
.face__item:not(:nth-child(3n)) {
  margin: 0 2vw 2vw 0;
}
.face__item-img {
  width: 14vw;
  height: 14vw;
  background: #ffffff;
}
.select {
  margin-top: 8px;
}
</style>