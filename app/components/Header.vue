<script setup lang="ts">

</script>

<template>
  <header class="container flex h-20 w-full items-center justify-between">
    <div class="flex items-center gap-3">
      <img src="/logo.svg" width="25">
      <p class="text-2xl font-semibold">
        Formbean
      </p>
    </div>

    <navlink class="text-sm font-medium">
      <ul class="flex list-none gap-6">
        <li>Integrations</li>
        <li>Docs</li>
        <li>Blogs</li>
        <li>Pricing</li>
      </ul>
    </navlink>

    <div class="flex items-center gap-2">
      <Button variant="outline">
        Login
      </Button>
      <Button>
        Sign Up
      </Button>
    </div>
  </header>
</template>
