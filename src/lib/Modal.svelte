<script>
    export let isOpen = false;
    export let onClose = () => {};
  </script>
  
  <style>
    .modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1000;
    }
    .modal-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      padding: 1rem;
      border-radius: 8px;
      width: 300px;
    }
  </style>
  
  <div class="modal" style="display: {isOpen ? 'block' : 'none'}" on:click={onClose}>
    <div class="modal-content" on:click|stopPropagation>
      <slot></slot>
    </div>
  </div>
  