<div align="center">
  <h1>Writer's Cloud </h1>
</div>
Writer's Cloud is a writing assistant where you can create your own characters,
give them personality traits and see them voiced and brought to life. 

[Video]

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/username/repository.git
    ```

2. **In a code editor of your choice, navigate to the project directory:**
    ```bash
    cd repository
    ```

3. **Install required dependencies:**
    ```bash
    pnpm install
    ```
    If you haven't installed `pnpm` yet, running this command will result in a message indicating that the command was not found. In that case, you would need to install it first. Node.js can be installed from its [official website](https://nodejs.org/en/download/package-manager) or via a package manager like [Homebrew](https://brew.sh/), and `pnpm` can be installed via npm (which comes with Node.js) by running `npm install -g pnpm` in the terminal.

4. **Set environment variables for authentication:**  
    
    You'll need your Hume API key and Secret key which are accessible from the Portal. See Hume's documentation on [getting your api keys](https://dev.hume.ai/docs/introduction/api-key).

    There is an example file called [`.env.example`]. After obtaining your API keys, Create a `.env` file, copy/paste the contents of the `.env.example` file, and fill in your environment variables.

    ```sh
    VITE_HUME_API_KEY="<YOUR_API_KEY>"
    VITE_HUME_SECRET_KEY="<YOUR_SECRET_KEY>"
    ```

    Note the `VITE` prefix to the environment variables. This prefix is required for vite to expose the environment variables to the client. For more information, see the [vite documentation](https://vitejs.dev/guide/env-and-mode) on environment variables and modes.

## Serve Project
Below are the steps to run the project locally:
1. Run `pnpm i` to install required dependencies.
2. Run `pnpm build` to build the project.
3. Run `pnpm dev` to serve the project at `localhost:5173`.

## Usage


