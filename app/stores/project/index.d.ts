type Attribute = {
      name: string,
} & ({
      children: Attribute[],
} | {
      value: 'number' | 'string' | 'boolean',
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