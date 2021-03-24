# Losung

A web app to display the Losung for today. Provides a simple navigation to show previous or next days Losung.

## Demo

<https://losung.devmount.de>

## For developers

1. Get all files

    ```bash
    git clone https://github.com/devmount/losung
    ```

2. Install all dependencies using [Yarn](https://yarnpkg.com)

    ```bash
    cd losung
    yarn
    ```

3. Get the CSV source file from Herrnhuter Brüdergemeinde for the current year, rename and move it to the `public` directory. This step has to be repeated every year. Here an example for 2022:

    ```bash
    wget https://www.losungen.de/fileadmin/media-losungen/download/Losung_2022_CSV.zip
    unzip Losung_2022_CSV.zip
    mv "Losungen Free 2022.csv" public/2022.csv
    ```

4. Either start the development server with hot reload at localhost:8080 ...

    ```bash
    yarn serve
    ```

5. ... or create a production build with minification

    ```bash
    yarn build
    ```
