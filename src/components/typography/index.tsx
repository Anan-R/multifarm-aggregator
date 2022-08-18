import makeStyles from '@material-ui/core/styles/makeStyles'
import classNames from 'classnames'
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps
} from 'react-router-dom'

const useLinkStyles = makeStyles({
  root: {
    color: '#66C8FF',
    fontWeight: 700,
    textDecoration: 'none',

    '&:hover': {
      textDecoration: 'underline'
    }
  }
})

interface LinkProps extends RouterLinkProps {
  native?: boolean
}

export function Link(props: LinkProps) {
  const classes = useLinkStyles()

  if (props.native) {
    return (
      <a
        href={props.to as string}
        className={classNames(classes.root, props.className)}
        {...props}
      />
    )
  }

  return (
    <RouterLink
      className={classNames(classes.root, props.className)}
      {...props}
    />
  )
}
