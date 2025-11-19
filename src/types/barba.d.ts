declare module '@barba/core' {
  export interface ITransitionData {
    current: {
      container: HTMLElement
    }
    next: {
      container: HTMLElement
    }
    trigger?: HTMLElement
  }

  export interface ITransition {
    name?: string
    async?: boolean
    leave?(data: ITransitionData): Promise<void> | void
    enter?(data: ITransitionData): Promise<void> | void
    beforeLeave?(data: ITransitionData): Promise<void> | void
    afterLeave?(data: ITransitionData): Promise<void> | void
    beforeEnter?(data: ITransitionData): Promise<void> | void
    afterEnter?(data: ITransitionData): Promise<void> | void
  }

  export interface IBarbaOptions {
    transitions?: ITransition[]
    views?: any[]
    prevent?: (args: { el: HTMLElement; href: string }) => boolean
  }

  const barba: {
    init(options: IBarbaOptions): void
    go(url: string): Promise<void>
    destroy(): void
    hooks: {
      before(callback: (data: ITransitionData) => void): void
      after(callback: (data: ITransitionData) => void): void
      enter(callback: (data: ITransitionData) => void): void
      leave(callback: (data: ITransitionData) => void): void
    }
  }

  export default barba
}
