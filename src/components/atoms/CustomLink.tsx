import Link from '@mui/material/Link';

type CustomLinkProps = {
  href: string
  children: React.ReactNode
}

const CustomLink = ({href, children}: CustomLinkProps) => {
  return(
    <div className="CustomLink" style={{marginBottom: '4px'}}>
      <Link 
        href={href}
        sx={{fontSize: '1.1rem',}}>
        {children}
      </Link>
    </div>
  )
}

export default CustomLink;
