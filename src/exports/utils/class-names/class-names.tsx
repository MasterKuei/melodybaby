import classNames, { ArgumentArray } from "classnames"
import { twMerge } from "tailwind-merge"

const cn = (...args: ArgumentArray) => {
  return twMerge(classNames(args))
}

export default cn
