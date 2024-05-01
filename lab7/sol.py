import angr
import sys

def main():
    proj = angr.Project("./login")

    init_state = proj.factory.entry_state()

    simulation = proj.factory.simgr(init_state)
    
    def success_condition(state):
        return b"Login successful" in state.posix.dumps(sys.stdout.fileno())

    def fail_condition(state):
        return b"Login failed" in state.posix.dumps(sys.stdout.fileno())
        
    simulation.explore(find=success_condition, avoid=fail_condition)

    if simulation.found:
        solution_state = simulation.found[0]
        solution = solution_state.posix.dumps(sys.stdin.fileno())
        print(solution_state.posix.dumps(sys.stdin.fileno()))
    else:
        print("Password not found.")

if __name__ == "__main__":
    main()
