<template>
  <div class="pagination m-4" v-if="pageCount > 1">
    <ul class="list-reset flex">
      <li
        class="px-2 rounded"
        :class="previousClass"
        @click="setCurrentPage(Math.max(1, currentPage - 1))"
      >
        <a aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        v-for="page in pages"
        :key="page.number"
        class="px-2 cursor-pointer"
        :class="paginationItemClass(page)"
        @click="setCurrentPage(page.number)"
      >
        <a v-if="page.number"> {{ page.number }} </a
        ><span v-if="page.number === null">...</span>
      </li>
      <li
        :class="nextClass"
        class="px-2 rounded"
        v-on:click="setCurrentPage(Math.min(pageCount, currentPage + 1))"
      >
        <a aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
    <transition
      enter-active-class="animated faster fadeIn"
      leave-active-class="animated faster fadeOut"
    >
      <div
        class="fixed z-50 w-full h-full top-0 left-0 flex items-center justify-center"
        v-if="showPageSelector"
      >
        <div class="absolute w-full h-full bg-grey-darker opacity-50"></div>
        <div
          class="animated fadeInUp relative align-top m-auto justify-center px-8 bg-white rounded w-full shadow flex flex-col"
          :style="'width: 50%'"
        >
          <h2
            class="text-4xl text-center font-hairline leading-loose text-grey-darker mt-2 mb-8"
          >
            Select page
          </h2>
          <div
            class="text-xl leading-normal mb-8 form-group flex justify-center items-center"
          >
            <label>Page #</label>
            <input
              type="number"
              class="p-2 mx-2 border rounded"
              :max="pageCount"
              v-model="pageSelectorPageNum"
            />
          </div>
          <div class="inline-flex justify-center my-4">
            <button @click="setCurrentPage(pageSelectorPageNum)" class="button">
              Jump to Page
            </button>
          </div>
          <span
            @click="showPageSelector = false"
            class="absolute top-0 right-0 pt-4 px-4"
          >
            <svg
              class="h-12 w-12 text-grey hover:text-grey-darkest"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path
                d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
              />
            </svg>
          </span>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  props: {
    currentPage: {
      required: true,
      type: Number
    },
    pageCount: {
      required: true,
      type: Number
    }
  },

  data() {
    return {
      showPageSelector: false,
      pageSelectorPageNum: null
    };
  },

  computed: {
    previousClass() {
      if (this.currentPage === 1) {
        return "disabled";
      }

      return "cursor-pointer";
    },
    nextClass() {
      if (this.currentPage === this.pageCount) {
        return "disabled";
      }

      return "cursor-pointer";
    },
    pages() {
      let pages = [];

      if (this.pageCount > 10) {
        if (this.currentPage >= 7 && this.currentPage < this.pageCount - 5) {
          pages = pages.concat(this.makeRange(1, 2));
          pages.push({
            number: null
          });
          pages = pages.concat(
            this.makeRange(this.currentPage - 3, this.currentPage + 3)
          );
          pages.push({
            number: null
          });
          pages = pages.concat(
            this.makeRange(this.pageCount - 1, this.pageCount)
          );
        } else if (this.currentPage < 7) {
          pages = pages.concat(this.makeRange(1, 8));
          pages.push({
            number: null
          });
          pages = pages.concat(
            this.makeRange(this.pageCount - 1, this.pageCount)
          );
        } else if (this.currentPage >= this.pageCount - 5) {
          pages = pages.concat(this.makeRange(1, 2));
          pages.push({
            number: null
          });
          pages = pages.concat(
            this.makeRange(this.pageCount - 5, this.pageCount)
          );
        }
      } else {
        pages = this.makeRange(1, this.pageCount);
      }

      return pages;
    }
  },

  methods: {
    makeRange(start, end) {
      let range = [];
      for (var i = start; i <= end; i++) {
        range.push({
          number: i
        });
      }
      return range;
    },
    paginationItemClass(page) {
      if (!page.number) {
        return "disabled";
      }

      if (this.currentPage === page.number) {
        return "selected";
      }
    },
    setCurrentPage(newPageNumber) {
      if (!newPageNumber) {
        this.showPageSelector = true;
        return;
      }

      this.pageSelectorPageNum = false;
      this.showPageSelector = false;
      this.$emit("updatePageNumber", newPageNumber);
    }
  }
};
</script>
