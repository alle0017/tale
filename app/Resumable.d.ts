export type SceneResumable = {
      entities: EntityInstance[],
      walls: Body[],
      camera: CameraAttachment,
}  

export type Position = {
      x: number,
      y: number,
}

export type Body = {
      width: number,
      height: number
} & Position

export type CameraAttachment = {
      entityBind?: string,
      rotation: number,
      scale: number,
} & Position

export type EntityInstance = {
      variable: string,
      name: string,
      params: unknown[]
}

export type Entity = {
      name: string,
      customScript: boolean,
      image: string,
      position: boolean,
      body: boolean,
}