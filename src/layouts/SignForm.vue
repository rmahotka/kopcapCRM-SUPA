<template>
  <div class="h-screen sm:max-lg:p-0 lg:px-16 lg:py-8 lg:bg-[#f5f6f7]">
    <div
      class="flex bg-white h-full w-full z-10 sm:max-lg:rounded-none lg:rounded-3xl lg:shadow-xl"
    >
      <div
        class="lg:w-2/4 lg:m-3 lg:rounded-3xl lg:bg-[url('@/assets/signForm.png')] lg:bg-no-repeat lg:bg-cover lg:bg-bottom"
      ></div>
      <div class="mx-auto">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
