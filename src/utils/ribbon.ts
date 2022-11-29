export class Ribbon {
  public canvas: HTMLCanvasElement | null = null
  public config: Recordable
  public pr: number
  public width: number
  public height: number
  public f: number
  public q: Recordable[]
  public t: number
  public r: number
  public pi: number
  constructor(conf?: { z: number; a: number; s: number }) {
    const c = document.createElement('canvas')
    c.setAttribute('id', 'ribbon-box')
    this.canvas = c
    this.pr = window.devicePixelRatio || 1
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.config = Object.assign({ z: -1, a: 0.6, s: 90 }, conf)
    this.f = 0
    this.q = []
    this.t = 0
    this.r = 0
    this.pi = Math.PI * 2
    this.f = this.config.s
  }

  createCanvas() {
    if (!this.canvas) return
    const canvas = this.canvas
    const config = this.config
    const pr = this.pr
    const g2d = canvas.getContext('2d')
    const width = this.width
    const height = this.height
    canvas.width = width * pr
    canvas.height = height * pr
    if (!g2d) return
    g2d?.scale(pr, pr)
    g2d.globalAlpha = config.a
    canvas.style.cssText = `opacity: ${config.a}; position:fixed;top:0;left:0;z-index: ${config.z}; width:100%;height:100%;pointer-events:none;`
    // // create canvas
    document.getElementsByTagName('body')[0].appendChild(canvas)
  }

  redraw() {
    if (!this.canvas) return
    const g2d = this.canvas.getContext('2d')
    g2d?.clearRect(0, 0, this.width, this.height)
    this.q = [
      { x: 0, y: this.height * 0.7 + this.f },
      { x: 0, y: this.height * 0.7 - this.f }
    ]
    while (this.q[1].x < this.width + this.f) this.draw(this.q[0], this.q[1])
  }

  draw(i: Recordable, j: Recordable) {
    if (!this.canvas) return
    const g2d = this.canvas.getContext('2d')
    const cos = Math.cos
    g2d?.beginPath()
    g2d?.moveTo(i.x, i.y)
    g2d?.lineTo(j.x, j.y)
    const k = j.x + (Math.random() * 2 - 0.25) * this.f
    const n = this.line(j.y)
    g2d?.lineTo(k, n)
    g2d?.closePath()
    this.r -= this.pi / -50
    if (!g2d) return
    g2d.fillStyle = `#${(
      ((cos(this.r) * 127 + 128) << 16) |
      ((cos(this.r + this.pi / 3) * 127 + 128) << 8) |
      (cos(this.r + (this.pi / 3) * 2) * 127 + 128)
    ).toString(16)}` as string
    g2d?.fill()
    this.q[0] = this.q[1]
    this.q[1] = { x: k, y: n }
  }

  private line(p: number): number {
    this.t = p + (Math.random() * 2 - 1.1) * this.f
    return this.t > this.height || this.t < 0 ? this.line(p) : this.t
  }
}
