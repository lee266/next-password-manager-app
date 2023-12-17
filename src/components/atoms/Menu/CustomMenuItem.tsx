import MenuItem, { MenuItemProps } from '@mui/material/MenuItem';

type CustomMenuItemProps = {
  children: React.ReactNode;
  value?: any;
} & MenuItemProps;

const CustomMenuItem: React.FC<CustomMenuItemProps> = ({ children, value, ...props }) => (
  <MenuItem className='dark:text-white dark:bg-back-rightDark' value={value} {...props}>
    {children}
  </MenuItem>
);

export default CustomMenuItem;

