<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
</script>

<template>
  <main class="flex min-h-screen flex-col">
    <Header />
    <section
      class="relative container min-h-[768px] py-16"
    >
      <div class="absolute inset-0">
        <img
          class="h-full w-full object-cover object-top"
          src="/background-pattern.svg"
        >
      </div>
      <div class="flex flex-col gap-6 text-center">
        <h1 class="text-5xl font-medium">
          A form builder for beans
        </h1>
        <p>Create powerful forms and share them anywhere in seconds. Get started for free.</p>
        <div>
          <Button>Get Started <ArrowRight /></Button>
        </div>
      </div>
    </section>
  </main>
</template>
