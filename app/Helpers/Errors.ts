const get_error_message = (message?: string | 'check_system_log') => ({
  messages: [
    {
      message: message || 'check_system_log',
    },
  ],
})

const get_validator_message = (message: string) => {
  return { errors: [{ message }] }
}

export { get_error_message, get_validator_message }
