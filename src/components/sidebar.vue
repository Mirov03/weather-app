<template>
    <div class="root">
        <nav class="sidebar">
            <header>
                <div class="image-text">
                    <span class="image">
                        <img src="@/assets/images/weather-icons/02d.png" alt="">
                    </span>
                </div>
            </header>

            <div class="menu-bar">
                <div class="menu">
                    <ul class="menu-links">
                        <li class="nav-link">
                            <router-link to="/" class="nav-item">
                                <i class="fa-solid fa-cloud-sun-rain"></i>
                                <span class="nav-item__text">Weather</span>
                            </router-link>
                        </li>
                        <li class="nav-link">
                            <router-link to="/cities" class="nav-item">
                                <i class="fa-solid fa-list"></i>
                                <span class="nav-item__text">Cities</span>
                            </router-link>
                        </li>
                        <li class="nav-link">
                            <router-link to="/settings" class="nav-item">
                                <i class="fa-solid fa-sliders"></i>
                                <span class="nav-item__text">Settings</span>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    </div>
</template>

<script>
export default {
    name: 'sidebar-component'
}
</script>

<style scoped>
.sidebar {
    position: absolute;
    top: 2%;
    left: 2%;
    height: 96%;
    width: 150px;
    border-radius: 30px;
    background: var(--bg-color-cards);
}

.sidebar header .image-text .image {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.sidebar header .image-text .image img {
    width: 100px;
    border-bottom: 2px solid var(--text-color-gray);
}

.sidebar .menu-bar {
    margin-top: 30%;
}

.sidebar .menu-bar .menu-links {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;

    margin: 0;
    padding: 0;
}

.sidebar .menu-bar .menu-links .nav-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;

    text-decoration: none;
    width: 100px;
    height: 100px;
    border-radius: 10px;
    transition: var(--tran-03);
}

.sidebar .menu-bar .menu-links .nav-item:hover {
    background: var(--bg-color-cards-hover);
}

.sidebar .menu-bar .menu-links .nav-item i {
    color: var(--text-color-gray);
    font-size: 24px;
    transition: var(--tran-03);
}

.sidebar .menu-bar .menu-links .nav-item .nav-item__text {
    font-family: var(--mitr);
    color: var(--text-color-gray);
    transition: var(--tran-03);
}

.sidebar .menu-bar .menu-links .nav-item.router-link-active {
    background: var(--bg-color-cards-hover);
}

.sidebar .menu-bar .menu-links .nav-item.router-link-active i {
    color: var(--text-color);
}

.sidebar .menu-bar .menu-links .nav-item.router-link-active .nav-item__text {
    color: var(--text-color);
}
</style>