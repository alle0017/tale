export type SceneResumable = {
      entities: EntityInstance[],
      walls: Body[],
      camera: CameraAttachment,
}  

export type Body = {
      x: number, 
      y: number,
      width: number,
      height: number
}

export type CameraAttachment = {
      entityBind?: string,
      rotation: number,
      scale: number,
      x: number,
      y: number,
}

export type EntityInstance = {
      variable: string,
      name: string,
      params: unknown[]
}