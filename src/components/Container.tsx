import { ForwardRefExoticComponent, RefAttributes, forwardRef } from 'react'
import clsx from 'clsx'

type TContainer = ForwardRefExoticComponent<ContainerProps & RefAttributes<HTMLDivElement>> & {
  Outer: typeof OuterContainer
  Inner: typeof InnerContainer
}

type ContainerProps = {
  className?: string
  children: React.ReactNode
}

type OuterContainerProps = {
  className?: string
  children: React.ReactNode
}

type InnerContainerProps = {
  className?: string
  children: React.ReactNode
}

const OuterContainer = forwardRef<HTMLDivElement, OuterContainerProps>(function OuterContainer(
  { className, children, ...props },
  ref
) {
  return (
    <div ref={ref} className={clsx('sm:px-8', className)} {...props}>
      <div className="mx-auto max-w-7xl lg:px-8">{children}</div>
    </div>
  )
})

const InnerContainer = forwardRef<HTMLDivElement, InnerContainerProps>(function InnerContainer(
  { className, children, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={clsx('relative px-4 sm:px-8 lg:px-12', className)}
      {...props}
    >
      <div className="mx-auto max-w-2xl lg:max-w-5xl">{children}</div>
    </div>
  )
})

//FIXME: This is a hack to get around the fact that I can't figure out how to get the types to work
export const Container: any = forwardRef<HTMLDivElement, ContainerProps>(function Container(
  { children, ...props },
  ref
) {
  return (
    <OuterContainer ref={ref} {...props}>
      <InnerContainer>{children}</InnerContainer>
    </OuterContainer>
  )
})

Container.Outer = OuterContainer
Container.Inner = InnerContainer
