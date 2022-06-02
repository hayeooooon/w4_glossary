const deviceSizes = {
  tablet_s: "720px",
  tablet: "1024px",
  laptop: "1280px",
};

const device = {
  tablet_s: `screen and (max-width: ${deviceSizes.tablet_s})`,
  tablet: `screen and (max-width: ${deviceSizes.tablet})`,
  laptop: `screen and (max-width: ${deviceSizes.laptop})`,
};

const theme = {
  device
};

export default theme;