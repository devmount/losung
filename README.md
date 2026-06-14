# Losung

A web app to display the Losung for today. Provides a simple navigation to show previous or next days Losung.

## Demo

<https://losung.devmount.de>

![image](https://github.com/devmount/losung/assets/5441654/9f6ac699-da2f-4cd0-8910-d002c192c1e6)

## For developers

1. Get all files

    ```bash
    git clone https://github.com/devmount/losung
    ```

2. Install all dependencies

    ```bash
    cd losung
    npm install
    ```

3. Get the XML source file from Herrnhuter Brüdergemeinde for the current year, rename and move it to the `public` directory. This step has to be repeated every year. Here an example for 2026:

    ```bash
    wget https://www.losungen.de/fileadmin/media-losungen/download/Losung_2026_XML.zip
    unzip Losung_2026_XML.zip
    mv "Losungen Free 2026.xml" public/2026.xml
    ```

4. Either start the development server with hot reload at localhost:8080 ...

    ```bash
    npm run dev
    ```

5. ... or create a production build with minification

    ```bash
    npm run build
    ```
