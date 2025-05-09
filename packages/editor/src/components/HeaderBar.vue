import { ref } from 'vue'

const ipcMessage = ref('')
async function testIpc() {
  // @ts-ignore
  console.log(window.electron?.ipcRenderer)
  // @ts-ignore
  const result = await window.electron?.ipcRenderer.invoke('ping')
  console.log(result)
  // @ts-ignore
  ipcMessage.value = result || 'No response'
}

const page = ref<'welcome' | 'new'>('welcome')
function setPage(p: 'welcome' | 'new') {
  page.value = p
}