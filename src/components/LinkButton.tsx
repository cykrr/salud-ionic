import { IonRouterLink } from '@ionic/react'
import Button from '../components/Button'
type LinkButtonArgs = {
    href: string
    children?: React.ReactNode
    className?: string
}
export default function LinkButton(args: LinkButtonArgs) {
    return (
        <IonRouterLink routerLink={args.href}>
            <Button className={args.className}>{args.children}</Button>
        </IonRouterLink>
    )
}