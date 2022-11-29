import { defineComponent } from 'vue'
import './404.scss'
import Svg404 from './404.svg'
export default defineComponent({
  name: '404',
  setup() {
    return () => (
      <div class="wrapper-404">
        <Svg404 />
      </div>
    )
  }
})
