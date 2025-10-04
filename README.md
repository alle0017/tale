# Tale

## Project Overview
Tale is a modular and extensible framework designed for building interactive applications, such as games or simulations. It provides a robust architecture for managing entities, components, systems, and rendering pipelines, making it easier to create and maintain complex projects. It is based around a functional-like ECS system, that encounter a little bit of OOP concepts like inheritance, to enhance code reusability

## Features
- **Entity-Component-System (ECS)**: A flexible ECS architecture for managing game objects and their behaviors.
- **Rendering Pipeline**: A customizable rendering system with support for shaders and buffers.
- **Debugging Tools**: Includes a suite of debugging components like collision watchers, frame rate monitors, and entity explorers.
- **Pixel Editor**: Tools for creating and editing pixel art directly within the application.
- **Modular Design**: Organized into reusable modules for better maintainability and scalability.

## Folder Structure
The project is organized as follows:

```
src/
├── index.js                # Entry point of the application
├── debug/                 # Debugging tools and components
│   ├── components/       # Individual debug components
│   └── icons/            # Icons used in debugging tools
├── ecs/                   # Entity-Component-System implementation
├── game/                  # Core game logic and scenes
├── lib/                   # Utility libraries and shared components
├── rendering/             # Rendering pipeline and shader management
├── types/                 # Type definitions and utilities
```

### Key Directories
- **`src/ecs/`**: Contains the core ECS implementation, including `Component`, `Entity`, `System`, and `World` classes.
- **`src/rendering/`**: Manages the rendering pipeline, including shaders, buffers, and rendering contexts.
- **`src/debug/`**: Debugging tools such as `collision-watcher`, `frame-rate`, and `entity-explorer`.
- **`src/game/`**: Game-specific logic, including the `Game` and `Scene` classes.
- **`src/lib/`**: Shared utilities like `Drawable`, `Physics`, and `Sprite`.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/tale.git
   ```

2. Navigate to the project directory:
   ```bash
   cd tale
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Build the project (if applicable):
   ```bash
   npm run build
   ```

## Usage

1. Start the development server:
   ```bash
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000`.

3. Explore the application and its features.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to your fork:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).