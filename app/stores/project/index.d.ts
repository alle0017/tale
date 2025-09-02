type Attribute = {
      name: string,
} & ({
      children: Attribute[],
} | {
      type: 'number' | 'string' | 'boolean',
      value: string
})

type Component = {
      name: string,
      attributes: Attribute[],
}

type EntityInstance = {
      type: string,
      name: string,
      components: Component[],
}

type Entity = {
      components: Component[]
}

type Scene = {
      entities: EntityInstance[],
}

type Project = {
      scenes: Record<string,Scene>,
      entities: Record<string,Entity>,
}