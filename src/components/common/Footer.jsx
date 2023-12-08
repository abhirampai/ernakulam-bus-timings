const Footer = () => {
  return (
    <div className="flex-col dark:text-gray-300 text-center fixed bg-gray-200 dark:bg-gray-700 bottom-0 w-full py-5">
      <div>
        Vectors and icons by{" "}
        <a
          href="https://www.pixelbazaar.com/goodie/responsive-icons?ref=svgrepo.com"
          target="_blank"
          rel="noreferrer"
        >
          Pixelbazaar
        </a>{" "}
        in CC Attribution License via{" "}
        <a href="https://www.svgrepo.com/" target="_blank" rel="noreferrer">
          SVG Repo
        </a>
      </div>
    </div>
  );
};

export default Footer;
